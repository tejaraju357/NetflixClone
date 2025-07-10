import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-black text-white flex justify-center">
      <div className="flex flex-col items-center text-center p-6 gap-4">
        <div className="flex gap-6 text-2xl">
          <FaGoogle className="cursor-pointer hover:text-red-500 transition" />
          <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
          <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
          <FaYoutube className="cursor-pointer hover:text-red-600 transition" />
        </div>
        <div className="mt-2">
          <h1 className="text-lg md:text-xl font-semibold">Contact Us</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
