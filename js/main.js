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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = (i) => {
  const newComment = {
    id: i,
    avatar: `img/avatar-${getRandomInteger(1,6)}`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
  return newComment;
};

const createCommentsArray = () => {
  const commentsQuantity = getRandomInteger(0,30);
  const comments = [];
  for (let i = 0; i < commentsQuantity; i++){
    comments[i] = createComment(i);
  }
  return comments;
};

const createPost = (i) => {
  const newPost = {
    id : i,
    url: `photos/${i}.jpg`,
    description: 'I read the news today, oh boy, about a lucky man who made the grade',
    likes: getRandomInteger(15,200),
    comments: createCommentsArray()
  };
  return newPost;
};

//основной метод
const createPostsArray = () => {
  const posts = [];
  for (let i = 0; i < 25; i++){
    posts[i] = createPost(i);
  }
  return posts;
};
