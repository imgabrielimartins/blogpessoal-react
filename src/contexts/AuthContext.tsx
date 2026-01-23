import { createContext, useState, type ReactNode, useEffect } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Services";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {

  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const usuarioSalvo = localStorage.getItem("@usuario");
    return usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : {
          id: 0,
          nome: "",
          usuario: "",
          senha: "",
          foto: "",
          token: "",
        };
  });

  const [isLoading, setIsLoading] = useState(false);



  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);

      ToastAlerta("Usuário autenticado com sucesso!", "sucesso");

    } catch (error) {

      setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
      });

      ToastAlerta("Os dados do usuário estão inconsistentes!", "erro");
    }

    setIsLoading(false);
  }


  function handleLogout() {
    localStorage.removeItem("@usuario");

    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });

    ToastAlerta("Usuário desconectado com sucesso!", "info");
  }


  useEffect(() => {
    if (usuario.token) {
      localStorage.setItem("@usuario", JSON.stringify(usuario));
    }
  }, [usuario]);

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
