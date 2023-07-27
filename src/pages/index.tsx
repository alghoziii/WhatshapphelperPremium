import { AxiosError } from "axios";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { FaCheck, FaCopy } from "react-icons/fa";

import Button from "@/components/buttons/Button";
import Layout from "@/components/layouts/Layout";
import {
  CountryCodeProps,
  getCountryCodes,
  LinkContent,
  LinkResponse,
  shortenedURL,
} from "@/lib/fetcher/fetcher";
import clsxm from "@/lib/helpers/clsxm";

export async function getStaticProps() {
  const countryCodes = await getCountryCodes();
  return {
    props: {
      countryCodes,
    },
    revalidate: 60,
  };
}

const Home = ({ countryCodes }: { countryCodes: Array<CountryCodeProps> }) => {
  const countryCodeList = countryCodes ?? [];
  const [waNum, setWANum] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("62");
  const [message, setMessage] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<string>("");

  const handleWANum = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWANum(String(e.target.value));
  };

  const handleCountryCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setCountryCode(e.target.value.replace("+", ""));
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // return setMessage(encodeURIComponent(e.target.value));
    // Mengambil teks pesan dari textarea
    const inputMessage = e.target.value;

    // Memeriksa apakah teks pesan melebihi 20 karakter
    if (inputMessage.length <= 20) {
      // Mengatur state pesan dengan teks pesan yang sudah dienkripsi
      setMessage(encodeURIComponent(inputMessage));
    } else {
      // Jika teks pesan melebihi 20 karakter, ambil hanya 20 karakter pertama
      setMessage(encodeURIComponent(inputMessage.slice(0, 20)));
    }
  };

  const handleCopiedLink = async () => {
    setCopiedLink("");
    setIsCopied(true);

    await shortenedURL(
      `https://wa.me/${countryCode + waNum}${
        message.length > 0 ? "?text=" + message : ""
      }`,
      "tinyurl.com"
    )
      .then((res: LinkContent) => {
        setCopiedLink(res.tiny_url);
        navigator.clipboard.writeText(res.tiny_url);
      })
      .catch((err: AxiosError<LinkResponse>) => {
        alert(err.response?.data.errors?.map((errorMessage) => errorMessage));
      });

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  const openWAAPI = () => {
    return window.open(
      isMobile
        ? `https://wa.me/${countryCode + waNum}${
            message.length > 0 ? "?text=" + message : ""
          }`
        : `https://web.whatsapp.com/send?phone=${countryCode + waNum}${
            message.length > 0 ? "&text=" + message : ""
          }`,
      "_blank"
    );
  };

  return (
    <Layout>
      <main className="layout-container">
        <section className="space-y-4 text-center">
          <h1>WhatsApp Helper</h1>

          <h4>
            web untuk menghemat waktu Anda untuk mengobrol langsung tanpa
            menyimpan nomor telepon.
          </h4>
        </section>

        <section className="mx-auto my-10 max-w-lg space-y-2 px-4 md:px-0">
          <div className="space-y-2">
            <label
              htmlFor="phoneNum"
              className="after:ml-1 after:text-red-500 after:content-['*']"
            >
              Phone Number
            </label>

            <div className="flex gap-2">
              <input
                type="tel"
                list="countryCode"
                name="code"
                id="code"
                defaultValue="62"
                className={clsxm("base-form w-20")}
                onChange={handleCountryCode}
              />

              <datalist id="countryCode">
                {countryCodeList.map((code) => (
                  <option
                    value={code.dial_code}
                    key={`${code.dial_code}-${code.code}-${code.name}`}
                  >{`${code.dial_code} ${code.name}`}</option>
                ))}
              </datalist>

              <input
                type="number"
                name="phoneNum"
                id="phoneNum"
                alt="phoneNum"
                placeholder="Example: 85285569094"
                className={clsxm("base-form w-full")}
                onChange={handleWANum}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message">Message (optional)</label>
            <div className="flex">
              <textarea
                name="message"
                id="message"
                className={clsxm("base-form w-full")}
                rows={3}
                placeholder="Any message?"
                onChange={handleMessage}
              />
            </div>
            {message.length > 20 && (
              <p className="text-sm text-red-500">
                Text Melebihi Karakter silahkan gunakan Premium.
              </p>
            )}
          </div>

          <div className="flex justify-between gap-2">
            <Button
              className={clsxm("grow justify-center")}
              disabled={waNum.length < 11 || message.length > 20}
              onClick={() => openWAAPI()}
              role="generateButton"
            >
              Generate
            </Button>

            <Button
              variant="outline"
              className="grow gap-2"
              onClick={() => handleCopiedLink()}
              isLoading={copiedLink.length < 1 && isCopied ? true : false}
              disabled={waNum.length < 11}
            >
              <FaCopy size="16" /> Copy Link
            </Button>
          </div>
        </section>

        <section
          className={clsxm(
            "invisible mx-auto my-4 max-w-lg rounded p-3",
            "bg-teal-200 dark:bg-teal-500",
            isCopied && copiedLink.length > 1 && "visible"
          )}
        >
          <div className="inline-flex w-full items-center justify-between gap-2">
            <p className="text-xs">
              Copied URL: <span className="font-bold italic">{copiedLink}</span>{" "}
            </p>

            <FaCheck size={16} />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
