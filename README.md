
# Domato - Online Food Ordering System (Backend)

Welcome to Domato! This backend application serves as the core system for managing  orders, restaurant data, and user interactions in our online pizza ordering platform.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pizza-palace-backend.git
   ```

2. **Install dependencies:**
   ```bash
   cd pizza-palace-backend
   npm install
   ```
   

3. **Set up environment variables:**

   Create a `config.env` file in the root directory of the project. Define the following environment variables:

   ```plaintext
   CLOUD_DATABASE=
   DOCKER_DATABSE=
   JWTSECRET=
   EXPIRE_TIME=90d
   COOKIE_EXPIRE_TIME=90d
   GMAIL_HOST=smtp.gmail.com
   GMAIL_PORT=587
   MYMAIL=
   MYMAIL_PASSWORD=
   NODE_ENV=
   ```
   
4. Start Server
     ```bash
   npm start
   ```
## API Endpoints

### Authentication

This collection of APIs manages user authentication, providing endpoints for user registration and login functionalities.

- **Sign Up (POST):**
  - **Endpoint:** `/v1/auth/signup`
  - **Description:** Allows users to create a new account by providing necessary registration details such as email, password, username, etc. Returns a success message upon successful registration.

- **Sign In (POST):**
  - **Endpoint:** `/api/v1/auth/login`
  - **Description:** Validates user credentials (email/username and password) to grant access to the application. Upon successful authentication, it generates an access token or session identifier for subsequent API requests.

### Admin Operations

This collection of APIs empowers administrators to manage restaurant-related operations.

- **Add Restaurant (POST):**
  - **Endpoint:** `/api/v1/restaurant/add`
  - **Description:** Enables administrators to add a new restaurant to the system by providing necessary details such as restaurant name, location, menu, contact information, etc. Returns success confirmation upon successful addition.

- **Delete Restaurant (DELETE):**
  - **Endpoint:** `/api/v1/restaurant/delete/{restaurant_id}`
  - **Description:** Allows administrators to delete a specific restaurant identified by its unique restaurant_id. This action removes the restaurant and its associated data from the system.

### User Operations

This collection of APIs empowers users to interact with restaurant data, create orders, and access order history.

- **Get Restaurant Data (GET):**
  - **Endpoint:** `/api/v1/restaurant/get`
  - **Description:** Retrieves a list of available restaurants along with their details (name, location, menu, etc.) for users to browse and explore.

- **Create Order (POST):**
  - **Endpoint:** `/api/v1/order/{restaurantId}/create`
  - **Description:** Enables users to create a new order by specifying the restaurant, selected menu items, quantity, delivery details, etc. Returns order confirmation and details upon successful creation.

- **Get Order History (GET):**
  - **Endpoint:** `/api/v1/order/getMyOrders`
  - **Description:** Retrieves the order history for the authenticated user, listing details of past orders including restaurant, items ordered, date/time, status, etc.

### Restaurant Owner Operations

This collection of APIs empowers restaurant owners to manage restaurant-related operations.

- **Change Restaurant Status (PUT):**
  - **Endpoint:** `/api/v1/restaurant/toggleStatus/{restaurantId}`
  - **Description:** Allows the restaurant owner to change the operational status of the restaurant (online/offline). This action affects the visibility and availability of the restaurant to users.

- **Change Order Status (PUT):**
  - **Endpoint:** `/api/v1/order/{restaurantId}/changeOrderStatus/{orderId}`
  - **Description:** Enables the restaurant owner to update the status of a specific order identified by its unique order_id. This action can include statuses like "Preparing", "Delivered", etc.

- **Menu Operations (POST/PUT/DELETE/GET):**

  #### Get Menu Items (GET):

  - **Endpoint:** `/api/v1/restaurant/{restaurantId}/menu/`
  - **Description:** Retrieves the list of existing menu items for the restaurant, providing details such as item name, description, price, etc.

  #### Update Menu Item (PUT):

  - **Endpoint:** `/api/v1/restaurant/{restaurantId}/menu/updateItem/{itemSlug}`
  - **Description:** Allows updates to an existing menu item specified by its unique item Slug, enabling changes to item details like name, description, price, etc.

  #### Delete Menu Item (DELETE):

  - **Endpoint:** `/api/v1/restaurant/{restaurantId}/menu/deleteItem/{itemSlug}`
  - **Description:** Permanently removes a specific menu item identified by its unique itemSlug from the restaurant's menu.

  #### Add New Menu Item (POST):

  - **Endpoint:** `/api/v1/restaurant/{restaurantId}/menu/addItem`
  - **Description:** Enables the addition of a new item to the restaurant's menu by providing details such as item name, description, price, etc.
   
- **Delivery Agent (POST/PUT/DELETE/GET):**

  #### Create Agent (POST):

  - **Endpoint:** `/api/api/v1/agent/create/`
  - **Description:** Create new Delivery Agnet

  #### Update Current Location Of Delivery Agent(PUT):

  - **Endpoint:** `/api/api/v1/agent/{agentId}`
  - **Description:** Update the the current Location of delivery agent

  #### Toggler current status of Agent  (GET):

  - **Endpoint:** `/api/api/v1/agent/{agentId}`
  - **Description:** Change the status of the delivery agent like agent is available or not.

  #### Add New Review to Agent (POST):

  - **Endpoint:** `/api/api/v1/agent/{agentId}`
  - **Description:** One can add rating and give commnets to the perticular agent

## Environment Variables

- `DATABASE`: Connection string for the MongoDB database
- `JWTSECRET`: Secret key for JWT authentication
- `EXPIRE_TIME`: Expiration time for JWT tokens
- `COOKIE_EXPIRE_TIME`: Expiration time for cookies
- `GMAIL_HOST`: Host for Gmail SMTP
- `GMAIL_PORT`: Port for Gmail SMTP
- `MYMAIL`: Your Gmail address for sending emails
- `MYMAIL_PASSWORD`: Your Gmail account password
- `NODE_ENV`: Environment configuration (e.g., DEVELOPMENT, PRODUCTION)

## Contributing

Feel free to contribute by opening issues or submitting pull requests.
```

Copy the above markdown content and paste it directly into your README.md file in your GitHub repository for the backend of Pizza Palace online pizza ordering system. Adjust as needed for any specific details or formatting preferences.
