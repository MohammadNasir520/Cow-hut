### live link: https://cow-hut-backend-admin-auth.vercel.app/

### Application Routes

### User
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/login (POST) <br>
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/signup (POST)
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/auth/refresh-token (POST)
###  Admins
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/admins/create-admin (POST)
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/admins/login (POST)

### user
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users (GET) <br>
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users/64a41b84c98a003f1caee7e9 (Single GET) <br>
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users/64a41b84c98a003f1caee7e9(PATCH) <br>
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users/64a41b84c98a003f1caee7e9 (DELETE) <br>

###  Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10 <br>
api/v1/cows?sortBy=price&sortOrder=asc<br>
api/v1/cows?minPrice=2000&maxPrice=80000<br>
api/v1/cows?location=Chattogram<br>
api/v1/cows?searchTerm=dha<br>
###  Orders
https://cow-hut-backend-admin-auth.vercel.app/api/v1/orders (POST) <br>
https://cow-hut-backend-admin-auth.vercel.app/api/v1/orders (GET) <br>
### bonus
Admin
-Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/admins/create-admin (POST)

My Profile
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users/my-profile (GET)
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/users/my-profile (PATCH)
Order:
Route: https://cow-hut-backend-admin-auth.vercel.app/api/v1/orders/64a41bf2c98a003f1caee7f2
