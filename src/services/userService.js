import bcrypt from 'bcrypt';

async function hashingPassword(password) { // 함수 추가
  return bcrypt.hash(password, 10);
}


async function createUser(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password); // 해싱 과정 추가
  const createdUser = await userRepository.save({ ...user, password: hashedPassword }); // password 추가
  return filterSensitiveUserData(createdUser);
}

function filterSensitiveUserData(user) {
  const { password, ...rest } = user;
  return rest;
}


async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function verifyPassword(inputPassword, savedPassword) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword); // 변경
  if (!isValid) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

