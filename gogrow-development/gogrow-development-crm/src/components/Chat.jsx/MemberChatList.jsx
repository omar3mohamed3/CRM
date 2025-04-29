import React from "react";

// Fake data for members
const members = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
];

const MemberChatList = ({ selectedChat, onSelectMemberChat }) => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-lg">Chats with {selectedChat?.name}</h3>

      {/* Display the list of members */}
      {members.map((member) => (
        <div
          key={member.id}
          className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => onSelectMemberChat(member)}>
          {member.name}
        </div>
      ))}
    </div>
  );
};

export default MemberChatList;
