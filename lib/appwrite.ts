import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.astrotify.aora",
  projectId: "672c85e8001dc6d45ba3",
  databaseId: "672c882600248b78efe0",
  usersCollectionId: "672c885d000ac75a8b10",
  videosCollectionId: "672c887d0017493e8ca3",
  storageId: "672cc2fc002d725d66fc",
};

const client = new Client();

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await account.create(ID.unique(), email, password, username);

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        email,
        username,
        avatar: avatarUrl,
        accountId: response.$id,
      }
    );

    const session = await loginUserWithEmailPassword({ email, password });

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUserWithEmailPassword = async ({ email, password }: { email: string; password: string }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("No user found");
    }

    const currentUsers = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUsers.documents.length) {
      throw new Error("No user found");
    }

    return currentUsers.documents[0];
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return;
  } catch (error) {
    throw error;
  }
};

export const fetchAllVideoPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videosCollectionId);

    return posts;
  } catch (error) {
    throw error;
  }
};

export const fetchLatestVideoPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videosCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts;
  } catch (error) {
    throw error;
  }
};
