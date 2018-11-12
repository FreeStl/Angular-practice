# Dependencies

- sqlite3
- node
- npm
- Angular
- Bootstrap


# Technical information
- Created navigation between main pages of application, which already existed in navbar
- Created functionality to getAll, edit, delete and view particular item, and populate these information about customers and products on those pages
- Added unit tests for services, and a few e2e tests 

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
