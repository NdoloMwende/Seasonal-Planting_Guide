import { toast } from 'react-toastify';

function useDeleteWithUndo({ endpoint, onSuccess }) {
  const deleteWithUndo = (item, label = "item") => {
    let undo = false;

    const toastId = toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete <strong>{item.name || item.cropName || label}</strong>?</p>
          <button onClick={() => {
            undo = true;
            closeToast();
          }}>Undo</button>
        </div>
      ),
      {
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        position: "top-right"
      }
    );

    setTimeout(async () => {
      if (undo) return;

      try {
        const res = await fetch(`${endpoint}/${item.id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete");

        toast.success(`${item.name || item.cropName || label} deleted`);
        onSuccess?.(item.id);
      } catch (err) {
        console.error(err);
        toast.error("Error deleting item");
      }
    }, 5000);
  };

  return deleteWithUndo;
}

export default useDeleteWithUndo;
