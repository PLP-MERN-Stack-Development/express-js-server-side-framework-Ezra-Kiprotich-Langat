1️⃣ GET /

Description: Returns a simple “Hello World” message.
Example Request:

GET /


Response:

"Hello World"

2️⃣ GET /api/products

Description: Get all products with optional filtering, pagination, and search.

Query Parameters:

Name	Type	Description
category	string	Filter by category
page	number	Page number (default: 1)
limit	number	Results per page (default: 5)
search	string	Search by product name

Example Request:

GET /api/products?category=electronics&page=1&limit=2&search=phone


Response:

{
  "total": 3,
  "page": 1,
  "limit": 2,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}

3️⃣ GET /api/products/:id

Description: Retrieve a product by its ID.
Example Request:

GET /api/products/1


Response:

{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}


Error (not found):

{ "error": "Product not found" }

4️⃣ POST /api/products

Description: Create a new product.
Authentication: Requires header x-api-key with correct value.

Headers:

x-api-key: mysecretkey
Content-Type: application/json


Request Body:

{
  "name": "Tablet",
  "description": "Android tablet with 10-inch display",
  "price": 300,
  "category": "electronics",
  "inStock": true
}


Response:

{
  "id": "generated-uuid",
  "name": "Tablet",
  "description": "Android tablet with 10-inch display",
  "price": 300,
  "category": "electronics",
  "inStock": true
}


Validation Errors:

{ "error": "All product fields are required." }


Authentication Errors:

{ "error": "Unauthorized. Invalid or missing API key." }

5️⃣ PUT /api/products/:id

Description: Update an existing product.
Authentication: Requires x-api-key header.

Example Request:

PUT /api/products/1


Request Body:

{
  "name": "Laptop Pro",
  "description": "Updated 32GB RAM laptop",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}


Response:

{
  "id": "1",
  "name": "Laptop Pro",
  "description": "Updated 32GB RAM laptop",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}

6️⃣ DELETE /api/products/:id

Description: Delete a product by ID.
Authentication: Requires x-api-key.

Example Request:

DELETE /api/products/2


Response:

{
  "message": "Product deleted",
  "deleted": [
    {
      "id": "2",
      "name": "Smartphone",
      "description": "Latest model with 128GB storage",
      "price": 800,
      "category": "electronics",
      "inStock": true
    }
  ]
} 