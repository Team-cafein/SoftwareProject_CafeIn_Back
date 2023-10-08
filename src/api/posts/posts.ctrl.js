// src/api/auth/posts.ctrl.js
import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types; // db에서 ObjectId만 추출

export const getPostById = async (ctx, next) => {
  // 한번만 구현하고 read, remove, update에 모두 적용하기 위해 미들웨어를 만듬
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    // ObjectId
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// id로 찾은 포스트가 로그인 중인 사용자가 작성한 포스트인지 확인 아니면 403 에러
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// 포스트 작성
// POST /api/posts
// {
//   title: '제목',
//   body: "내용",
//   tags: ['태그1','태그2']
// }

export const write = async (ctx) => {
  // request body 검증 절차
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 필수 항목
    body: Joi.string().required(), // required()가 있으면 필수 항목
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열이 있는지 확인
  });

  // 검증하고 나서 검증 실패한 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body; // post 매소드이므로 request.body에서 추출
  const post = new Post({
    // title, body, tags만 가지고 있는 새로운 객체 생성
    title,
    body,
    tags,
    user: ctx.state.user,
  });

  try {
    await post.save(); // 데이터를 다 받으면 post 인스턴스에 저장
    ctx.body = post; // body에 방금 post 내용을 저장
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 포스트 목록 조회
// GET /api/posts?username=&tag&page=

export const list = async (ctx) => {
  // qeury는 문자열이기 때문에 숫자로 변환해 주어야 함
  // 값이 주어지지 않았다면 1을 기본으로 사용
  const page = parseInt(ctx.query.page || '1', 10); // ctx.query는 주소창에서 ?로 작용 posts?page

  if (page < 1) {
    // 페이지가 1페이지 보다 작게 요청되면 오류
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec(); // 몽고 db Model로 선언했기 때문에 몽고 db method 사용가능,
    // sort -1을 통해 역순으로 구성, limit(10)으로 최대 10개씩 조회 가능, skip()을 통해 페이지네이션 구현
    const postCount = await Post.countDocuments(query).exec(); // 마지막페이지를 알려주기 위해 문서 데이터의 갯수를 변수에 저장
    ctx.set('Last-Page', Math.ceil(postCount / 10)); // 문서의 갯수를 10으로 나눈 몫을 ceil 올림을 하여 마지막페이지를 구함 0.4여도 무조건 1
    ctx.body = posts.map((post) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 특정 포스트 조회
// GET /api/posts/:id

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

// 특정 포스트 제거
// DELETE /api/posts/:id

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 포스트수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }

export const update = async (ctx) => {
  const { id } = ctx.params; // 주소창에서 변수인 id를 뽑아와야하므로 patch 매소드도 ctx.params으로 받음

  // write에서 사용한 schema와 비슷한데, required가 없음
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
      // false일 때는 업데이트 되기 전의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/auth/check

export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};
