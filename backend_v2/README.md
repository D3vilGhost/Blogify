
### 📦 Project Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/D3vilGhost/Blogify
cd Blogify/backend_v2
```

#### 2. Configure Application Properties

Update `src/main/resources/application.properties` with your environment-specific settings:

```properties
spring.application.name=blogify

# mongodb variables
spring.data.mongodb.uri=
spring.data.mongodb.database=
spring.data.mongodb.auto-index-creation=

# jwt variables 
jwt.secretKey=
jwt.expirationTime=86400000

# cloudinary variable
cloudinary.cloud_name=
cloudinary.api_key=
cloudinary.api_secret=

server.port=5000
```

#### 3. Build the Project

#### 4. Run the Application
