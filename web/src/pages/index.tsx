import Image from "next/image";

import appPreviewImg from "../assets/mobileApp.png";
import logoImg from "../assets/logo.svg";
import exampleAvatars from "../assets/avatares.svg";
import iconCheck from "../assets/icon.svg";
import { api } from "../lib/axios";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className="max-w-[1124px] mx-auto grid gap-28 grid-cols-2 h-screen items-center">
      <main>
        <Image src={logoImg} alt="" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={exampleAvatars} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500"> +{props.userCount}</span> pessoas já
            estão usando
          </strong>
        </div>
        <form action="" className="mt-10 flex gap-2">
          <input 
          className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm"
          type="text" 
          required 
          placeholder="Qual o nome do seu bolão" />
          <button 
          className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          type="submit"
          >
            Criar meu bolão
          </button>
        </form>
        <p className=" mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-4">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className=" w-px h-14 bg-gray-600"/>

          <div className="flex items-center gap-4">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="" quality={100} />
    </div>
  );
}

export const getServerSideProps = async () => {
  
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    api.get("/users/count")
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    },
  };
};
