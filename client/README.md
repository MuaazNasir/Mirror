
# Mirror's Client

this is the mirror's client part that will be displayed to the user


## Environmet Variables

### Zego Cloud :


| Variable | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `NEXT_PUBLIC_ZEGO_APP_ID` | `string` | **Required**.  zego cloud app id|
| `NEXT_PUBLIC_ZEGO_SERVER_SECRET` | `string` | **Required**.  zego cloud server secret |

> signup to [ZEGO CLOUD](https://zegocloud.com) and create a project and get the *app-id* and *server-secret* from it.
  

### Cloudinary :


| Variable | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `string` | **Required**.  cloudinary cloud name|
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | `string` | **Required**.  cloudinary api key |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `string` | **Required**.  cloudinary upload preset |

> signup to [Cloudinary](https://cloudinary.com) and create a project and get the *cloud-name*, *api-key* and *upload preset*  from it.

### Server and Events :

| Variable | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `NEXT_PUBLIC_SERVER_URL` | `string` | **Not Required**.  mirror server's url|
| `NEXT_PUBLIC_LAUNCH_DATE` | `string` | **Not Required**.  mirror's launch event date |


> the server's url is by default **http://localhost:4500**, if you change it in server then also change here


