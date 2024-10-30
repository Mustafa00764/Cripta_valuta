const Referral = () => {
  const referralLink = "https://legit.community/ref?user=123"; // Пример реферальной ссылки

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-8">
      <h2 className="text-xl font-bold">Refer Friends</h2>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="bg-gray-700 p-2 rounded-l-lg w-full"
        />
        <button
          onClick={copyToClipboard}
          className="bg-green-500 px-4 py-2 rounded-r-lg text-white"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default Referral;
