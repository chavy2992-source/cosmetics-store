# Project Guidelines & Architecture (AGENTS.md)

## Tech Stack
- **Runtime:** Node.js (ES Modules - `"type": "module"`)
- **Framework:** Express v5
- **Database:** MongoDB with Mongoose
- **Validation:** Joi

## Folder Structure
- `config/` - Database connection (`db.js`)
- `models/` - Mongoose schemas (`users.js`, `product.js`, `orders.js`)
- `controllers/` - Route handlers & business logic (`users.js`, `product.js`, `orders.js`)
- `routes/` - Express routers connecting endpoints, validation middlewares, and controllers
- `Validations/` - Joi validation schemas (`user.js`, `product.js`, `order.js`)
- `Middlewares/` - Custom middlewares (`custom.middleware.js`, `errores.middleware.js`, `validateJoi.middleware.js`)
- `utils/` - Utility classes (`AppError.js`)

## Coding Conventions
1. **Error Handling (Express 5):**
   - Do NOT wrap async controllers in `try/catch` blocks.
   - Throw operational errors using `throw new AppError(message, statusCode, type)`.
   - All errors are caught automatically by Express 5 and forwarded to `errorHandler` in `Middlewares/errores.middleware.js`.

2. **Validation:**
   - Every `POST` and `PUT` route must validate `req.body` using `validateBody(schema)` from `Middlewares/validateJoi.middleware.js` before reaching the controller.

3. **Database Relations:**
   - `orders` references `users` (`userId`) and `products` (`items._id`), while embedding `shippingAddress` and product snapshot details (`amount`, `priceAtPurchase`).
   - Use `.populate()` selectively only when relational details are required by the endpoint.