import { Link } from "react-router-dom";
import { useState } from "react";
import type { LoginDto } from "@domino/shared-types";
import {useAuth} from "../../../features/auth/model/useAuth.ts";
import * as React from "react";

const LoginPage = () => {

  const {register} = useAuth()

  const [loginData, setLoginData] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(loginData)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="m-auto w-full max-w-md p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Вход
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Введите ваши данные для входа
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Введите ваш email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Введите пароль"
              />
            </div>

            <button
              type="submit"

              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Войти
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              уже есть аккаунт? Войдите
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
