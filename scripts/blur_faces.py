import os
import cv2
import numpy as np

detector = cv2.FaceDetectorYN_create('yunet.onnx', '', (320, 320))
src_dir = './public/images/models_backup'
dst_dir = './public/images/models'

# Manual fallback coordinates if detector misses: (x, y, w, h)
manual_faces = {
    'model-9.jpeg': (267, 300, 136, 170),
    'model-32.jpeg': (330, 140, 360, 420),
}

for f in sorted(os.listdir(src_dir)):
    if not f.endswith('.jpeg'):
        continue
    
    img_path = os.path.join(src_dir, f)
    img = cv2.imread(img_path)
    if img is None:
        continue
    
    h, w = img.shape[:2]
    detector.setInputSize((w, h))
    _, faces = detector.detect(img)
    
    face_box = None
    if faces is not None and len(faces) > 0:
        best = max(faces, key=lambda x: x[2] * x[3])
        x, y, fw, fh = int(best[0]), int(best[1]), int(best[2]), int(best[3])
        # Expand slightly to cover full facial area (forehead to chin, ear to ear)
        margin_x = int(fw * 0.15)
        margin_y = int(fh * 0.15)
        fx = max(0, x - margin_x)
        fy = max(0, y - margin_y)
        fw = min(w - fx, fw + 2 * margin_x)
        fh = min(h - fy, fh + 2 * margin_y)
        face_box = (fx, fy, fw, fh)
    elif f in manual_faces:
        face_box = manual_faces[f]
    
    if face_box is not None:
        fx, fy, fw, fh = face_box
        cx = fx + fw // 2
        cy = fy + fh // 2
        rx = int(fw * 0.52)
        ry = int(fh * 0.58)
        
        # Create an elliptical mask
        mask = np.zeros((h, w), dtype=np.float32)
        cv2.ellipse(mask, (cx, cy), (rx, ry), 0, 0, 360, 1.0, -1)
        
        # Soft feathering at the edges of the blur for professional aesthetic
        feather = max(7, min(25, int(min(rx, ry) * 0.25)))
        if feather % 2 == 0:
            feather += 1
        mask = cv2.GaussianBlur(mask, (feather, feather), 0)
        mask = np.expand_dims(mask, axis=-1)
        
        # Strong Gaussian blur for complete privacy
        ksize = max(31, min(75, int(min(fw, fh) * 0.45)))
        if ksize % 2 == 0:
            ksize += 1
        blurred = cv2.GaussianBlur(img, (ksize, ksize), 0)
        
        # Blend original and blurred using soft feathered mask
        final_img = (img * (1.0 - mask) + blurred * mask).astype(np.uint8)
        
        out_path = os.path.join(dst_dir, f)
        cv2.imwrite(out_path, final_img, [cv2.IMWRITE_JPEG_QUALITY, 92])
        print(f"Processed {f}: face at center=({cx}, {cy}), radius=({rx}, {ry})")
    else:
        print(f"WARNING: No face found for {f}")

print("All model faces blurred successfully.")
