import { toast } from 'react-toastify';

function useDeleteWithUndo({ endpoint, onSuccess }) {
  const deleteWithUndo = (item, label = 'item') => {
    let undoClicked = false;

    const toastId = toast(
       ({ closeToast }) => (                  // i tried figuring our why closeToast is not read ...everything is working though//
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p>
            Are you sure you want to delete <strong>{item.name || item.cropName || label}</strong>?
          </p>
          <button
            onClick={() => {
              undoClicked = true;
              toast.dismiss(toastId);
              toast.info('Deletion cancelled');
            }}
            style={{ padding: '4px 8px', background: '#ccc', border: 'none', cursor: 'pointer' }}
          >
            Undo
          </button>
        </div>
      ),
      {
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        position: 'top-right',
      }
    );

    // Wait until the toast auto-closes or is dismissed
    setTimeout(async () => {
      if (undoClicked) return;

      try {
        const res = await fetch(`${endpoint}/${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');

        toast.success(`${item.name || item.cropName || label} deleted`);
        onSuccess?.(item.id);
      } catch (err) {
        console.error(err);
        toast.error('Error deleting item');
      }
    }, 3000);
  };

  return deleteWithUndo;
}

export default useDeleteWithUndo;
