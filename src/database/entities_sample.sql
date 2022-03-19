//users
CREATE TABLE [users] (
	[id] INT NULL,
	[name] VARCHAR (50),
	[email] VARCHAR (100),
	[address_geo_lat] FLOAT,
	[address_geo_lng] FLOAT
);
{
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "address_geo_lat": "-37.3159",
    "address_geo_lng": "81.1496",
}
// albums
CREATE TABLE [albums] (
    [userId] INT, 
    [id] INT, 
    [title] VARCHAR (200)
);
{
    "userId": 1,
    "id": 2,
    "title": "sunt qui excepturi placeat culpa"
}
// images
CREATE TABLE [images] (
	[albumId] INT,
	[id] INT,
	[title] VARCHAR NULL,
	[url] VARCHAR (300)
);
{
    "albumId": 97,
    "id": 4849,
    "title": "recusandae provident modi vitae ipsa rerum",
    "url": "https://via.placeholder.com/600/4e5c31"
}