#### **IMAGE PROCESSING** by Akshaya Hegde
_Project Objective:_

```
- Uploads an image file along with its timestamp (according to user's timezone).
- Creates multiple thumbnails.
- Adds watermark to image file.
```
Uploading image:

- cURL for post-image
```
curl --location --request POST 'http://13.127.234.41/akshaya/post-image' \
--form 'image=@"/path/to/file"' \
--form 'timezone=""' \
--form 'height=""' \
--form 'width=""' \
--form 'watermark=""' \
--form 'placement=""'
```

* Go to Body > form-data.
* Upload an image file in the "image" key.
* Provide the rest of the params. 

> **NOTE:** If the user doesn't provide the values for keys accept image and timezone then default values will be provided to the keys.



