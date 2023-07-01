### live link: https://cow-hut-backendauth-mohammadnasir520.vercel.app/

### Application Routes

### User
api/v1/auth/signup (POST) <br> 
api/v1/users (GET) <br>
api/v1/users/64a01c590bc5aa38d927239b (Single GET) <br> 
api/v1/users/64a01c590bc5aa38d927239b (PATCH) <br>
api/v1/users/64a01c590bc5aa38d927239b (DELETE) <br>
###  Cows
api/v1/cows (POST) <br>
api/v1/cows (GET) <br>
api/v1/cows/64a01dd9dc6163a7394f3e3f (Single GET) <br> 
api/v1/cows/64a01dd9dc6163a7394f3e3f (PATCH) <br>
api/v1/cows/64a01dd9dc6163a7394f3e3f (DELETE) <br> 
###  Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10 <br>
api/v1/cows?sortBy=price&sortOrder=asc<br>
api/v1/cows?minPrice=2000&maxPrice=80000<br>
api/v1/cows?location=Chattogram<br>
api/v1/cows?searchTerm=dha<br>
###  Orders
api/v1/orders (POST) <br>
api/v1/orders (GET) <br>