function ChatBox() {
  return (
    <div className="border-x h-screen">
      <h1 className="p-3 bg-white text-lg font-bold">Chats</h1>
      <div className=" bg-[#f2f2f2]"> chat container </div>

      <div className="">
        <input type="text" placeholder="Type something..." />
      </div>
    </div>
  );
}

export default ChatBox;
