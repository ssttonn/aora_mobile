import { Models } from "react-native-appwrite";

export const convertToPostModel = (post: Models.Document): IVideoPost => {
    return {
      id: post.$id,
      title: post.title,
      video: post.video,
      creator: {
        accountId: post.creator.accountId,
        username: post.creator.username,
        avatar: post.creator.avatar,
        email: post.creator.email,
      },
      thumbnail: post.thumbnail,
      prompt: post.prompt,
    };
  };