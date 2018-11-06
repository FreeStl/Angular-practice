# Works details
- Download ZIP repository
- Complete all Technical information
- Push completed test to your own github or any other repository hosting service
- Send link to us link with test (please make sure that this repository is public)

# Dependencies

- sqlite3
- node
- npm
- Angular
- Bootstrap


# Getting Started

###### Install npm dependencies
`npm install`

###### Run the frontend
`npm run frontend`

###### Run the backend server
`npm run backend`

###### Viewing the application in your browser
`http://localhost:4200`


# Technical information
You should implement next features:
- Create navigation between main pages of application, which already exist in navbar
- Create functionality to getAll, edit, delete and view particular item, and populate these information about customers and products on those pages
- All additional (unit test, e2e test and etc.) work are greetings 

# API information

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
