import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //check if a folder already exists with same name.
  let exists = await folderExists(data.owner_username, data.folder_name);
  if(exists){
      return failure({status: false});
  }

  //it does not already exist
  console.log("Folder with name " + data.folder_name + " from user " + data.owner_username + " does not exist (GOOD).");
  const params = {
    TableName: "swim_workout_folders",
    Item: {
      owner_username: data.owner_username,
      folder_name: data.folder_name,
      parent: data.parent,
      workouts: [],
      folders: []
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}

//checks if a folder exists
export async function folderExists(owner_username, folder_name){
    const params = {
        TableName: "swim_workout_folders",
        Key: {
            owner_username: owner_username,
            folder_name: folder_name
        }
    };

    let exists = false;

    let result = await dynamoDbLib.call("get", params);
    if(result.Item !== undefined && result.Item !== null){
        console.log("folder with name " + folder_name + " from user " + owner_username + " exists.");
        exists = true;
    }

    return exists;
}