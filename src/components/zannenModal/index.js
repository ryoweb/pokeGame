//おしい！モーダルのコンポーネント
export default function LoseModal({ isOpen, onClose }) {
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            className={`modal ${isOpen ? 'open' : ''}`}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
            <div
                className="modal-content"
                onClick={stopPropagation}
                style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px'}}
            >
                <h2>おしい！</h2>
            </div>
        </div>
    );
}