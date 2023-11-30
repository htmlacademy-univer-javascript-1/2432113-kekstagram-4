import { getRandomInteger, getRandomArrayElement } from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Джон',
  'Пол',
  'Джордж',
  'Ринго',
];

const DESCRIPTIONS = [
  'I read the news today, oh boy',
  'About a lucky man who made the grade',
  'And though the news was rather sad',
  'Well, I just had to laugh'
];

export const createCommentsArray = () => {
  const commentsQuantity = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < commentsQuantity; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

export const createPostsArray = () => {
  const posts = [];
  const postsQuantity = 25;
  for (let i = 0; i < postsQuantity; i++) {
    posts.push({
      id: i,
      url: `photos/${i+1}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: createCommentsArray(),
    });
  }
  return posts;
};
