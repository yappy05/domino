# Настройка общих типов для Domino e-commerce

## Обзор

Была создана общая библиотека типов `@domino/shared-types`, которая доступна как для фронтенда (`domino-front`), так и для бэкенда (`domino-backend`). Это обеспечивает консистентность типов между клиентом и сервером.

## Структура

```
libs/shared/types/
├── src/
│   ├── index.ts              # Главный файл экспорта
│   └── lib/
│       ├── auth/
│       │   └── auth.ts       # LoginDto, RegisterDto, LogoutDto
│       ├── user/
│       │   └── user.ts       # UserResponse
│       └── utils/
│           └── utils.ts      # ApiResponse<T>
├── dist/                     # Скомпилированные файлы
├── package.json
├── tsconfig.json
└── README.md
```

## Установка и настройка

### 1. Сборка общих типов

```bash
cd libs/shared/types
npm install
npm run build
```

### 2. Установка зависимостей в проектах

```bash
# Фронтенд
cd domino-front
npm install

# Бэкенд
cd domino-backend
npm install
```

## Использование

### Во фронтенде

```typescript
import type { LoginDto, RegisterDto, UserResponse } from "@domino/shared-types";

const [loginData, setLoginData] = useState<LoginDto>({
  email: "",
  password: "",
});
```

### В бэкенде

```typescript
import { LoginDto, RegisterDto, UserResponse } from '@domino/shared-types';

@MessagePattern('login')
async handleAuthLogin(@Payload() dto: LoginDto) {
  return this.appService.login(dto);
}
```

## Доступные типы

### Auth типы

- `LoginDto` - данные для входа (email, password)
- `RegisterDto` - данные для регистрации (name, email, password)
- `LogoutDto` - данные для выхода (userId)

### User типы

- `UserResponse` - ответ с данными пользователя (id, name, email, password, refreshToken?)

### Utils типы

- `ApiResponse<T>` - общий тип для API ответов (success, data?, message?, error?)

## Обратная совместимость

Старые импорты из `@domino-backend/utils` продолжают работать благодаря реэкспорту в файле `domino-backend/shared/utils/src/index.ts`.

## Разработка

### Добавление новых типов

1. Создайте файл в соответствующей папке `libs/shared/types/src/lib/`
2. Экспортируйте типы из `libs/shared/types/src/index.ts`
3. Пересоберите библиотеку: `npm run build`
4. Обновите зависимости в проектах: `npm install`

### Режим разработки

```bash
cd libs/shared/types
npm run dev  # Автоматическая пересборка при изменениях
```

## Преимущества

1. **Консистентность типов** - одинаковые типы на фронтенде и бэкенде
2. **Type Safety** - TypeScript проверяет совместимость типов
3. **Централизованное управление** - все типы в одном месте
4. **Легкое обновление** - изменения типов автоматически применяются везде
5. **Обратная совместимость** - старый код продолжает работать
