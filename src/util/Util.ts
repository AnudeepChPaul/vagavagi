import uuid from 'react-native-uuid'

export const generateRandomId = () => uuid.v4()

export const getAvatarText = (title: string) => {
  const intialsArray = title.split(" ").map(c => c[0]);
  return [intialsArray.at(0), intialsArray.at(-1)].join("");
}

