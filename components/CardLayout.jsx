import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export default function CardLayout({ onComplete }) {
  const [formData, setFormData] = useState({
    username: "",
    message: "",
  });

  const [modalConfig, setModalConfig] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.message) {
      setModalConfig({
        title: "입력 오류",
        content: "모든 항목을 입력해주세요.",
        onConfirm: () => setModalConfig(null),
      });
      return;
    }

    // 입력된 데이터 저장 후 공유 페이지로 이동
    onComplete(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-[#f8f5f2]">
      <h1 className="text-xl font-bold mb-4">편지를 작성하세요</h1>
      <input
        type="text"
        name="username"
        placeholder="이름을 입력하세요"
        value={formData.username}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="message"
        placeholder="편지 내용을 입력하세요"
        value={formData.message}
        onChange={handleInputChange}
        className="w-full p-2 border rounded h-32"
      ></textarea>
      <Button onClick={handleSubmit} message="작성 완료" />

      {modalConfig && (
        <Modal title={modalConfig.title} onConfirm={modalConfig.onConfirm}>
          {modalConfig.content}
        </Modal>
      )}
    </div>
  );
}
