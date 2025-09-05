# @domino/shared-types

Общие типы для проекта Domino e-commerce, доступные как для фронтенда, так и для бэкенда.

## Установка

### Для фронтенда (domino-front)

```bash
cd domino-front
npm install
```

### Для бэкенда (domino-backend)

```bash
cd domino-backend
npm install
```

## Использование

### Импорт типов

```typescript
import {
  LoginDto,
  RegisterDto,
  UserResponse,
  ApiResponse,
} from "@domino/shared-types";
```

### Доступные типы

#### Auth типы

- `LoginDto` - данные для входа
- `RegisterDto` - данные для регистрации
- `LogoutDto` - данные для выхода

#### User типы

- `UserResponse` - ответ с данными пользователя

#### Utils типы

- `ApiResponse<T>` - общий тип для API ответов

## Разработка

### Сборка типов

```bash
cd libs/shared/types
npm run build
```

### Режим разработки

```bash
cd libs/shared/types
npm run dev
```

## Структура

```
libs/shared/types/
├── src/
│   ├── index.ts              # Главный файл экспорта
│   └── lib/
│       ├── auth/
│       │   └── auth.ts       # Типы аутентификации
│       ├── user/
│       │   └── user.ts       # Типы пользователей
│       └── utils/
│           └── utils.ts      # Общие утилиты
├── package.json
├── tsconfig.json
└── README.md
```
