import { Link } from "react-router-dom";
import { useState } from "react";
import type { RegisterDto } from "@domino/shared-types";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<RegisterDto>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="m-auto w-full max-w-md p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Регистрация
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Создайте новый аккаунт
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="Введите ваш email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="Введите пароль"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-800 font-medium transition"
            >
              Уже есть аккаунт? Войдите
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
