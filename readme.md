### live link: https://cow-hut-backend-admin-auth.vercel.app/

### Application Routes

### User
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/login (POST) <br>
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/signup (POST)
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/refresh-token (POST)
###  Admins
Route: https://cow-hut-backend-admin-auth.vercel.app/v1/admins/create-admin (POST)
Route: https://cow-hut-backend-admin-auth.vercel.app/v1/admins/login (POST)
###  Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10 <br>
api/v1/cows?sortBy=price&sortOrder=asc<br>
api/v1/cows?minPrice=2000&maxPrice=80000<br>
api/v1/cows?location=Chattogram<br>
api/v1/cows?searchTerm=dha<br>
###  Orders
api/v1/orders (POST) <br>
api/v1/orders (GET) <br>