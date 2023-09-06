const DynamoDB = require('aws-sdk/clients/dynamodb');

const makeDdbClient = () => {
    const client = new DynamoDB.DocumentClient({
        convertEmptyValues: true,
        service: new DynamoDB({apiVersion: '2012-08-10'})
    });
    return client;
}

exports.dynamoPut = async (params) => {
    const DDB = makeDdbClient();
    const put_item = await DDB.put(params).promise();
    return put_item;
}

exports.dynamoQuery = async (params) => {
    const DDB = makeDdbClient();
    const query_items = await DDB.query(params).promise();
    return query_items.Items;
}

exports.dynamoDelete = async (params) => {
    const DDB = makeDdbClient();
    const delete_item = await DDB.delete(params).promise();
    return delete_item;
}

exports.dynamoUpdate = async (params) => {
    const DDB = makeDdbClient();
    const update_item = await DDB.update(params).promise();
    return update_item;
}

exports.dynamoGet = async (params) => {
    const DDB = makeDdbClient();
    const get_item = await DDB.get(params).promise();
    return get_item;
}

exports.dynamoScan = async (params) => {
    const DDB = makeDdbClient();
    let data_items = [];
    let scan = await DDB.scan(params).promise();
    data_items = scan.Items;
    while(scan.LastEvaluatedKey){
        scan = await DDB.scan({
            ...params,
            ExclusiveStartKey: scan.LastEvaluatedKey
        }).promise();
        Array.prototype.push.apply(data_items, scan.Items);
    }
    return data_items;
}