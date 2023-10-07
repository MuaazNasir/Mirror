# Mirror's Server

this is the mirror's server that is the backend part for APIs

**Written by Muaaz Nasir**

## Environmet Variables


| Variable | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `DATABASE_URL` | `string` | **Required**.  mongoDB's database URL url|
| `SERVER_PORT` | `string` | **Not Required**.  mirror's server port |

## Generate Prisma Assets

run the following command
```
npx prisma generate
```

### start prisma studio

```
npx prisma studio
```

## Starting The Server

start client by running 
```
npm start
```
**OR**
```
yarn start
```

