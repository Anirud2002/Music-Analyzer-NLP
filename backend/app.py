from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import dump, load
from transformers import BertTokenizer, BertModel
import torch

app = Flask(__name__)
CORS(app)

def encode_text(batch):
    """
    Encodes a line of text into a vector
    """
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    inputs = tokenizer(batch, return_tensors="pt", padding=True, truncation=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    vectors = []
    with torch.no_grad():
        outputs = model(**inputs)

    cls_embeddings = outputs.last_hidden_state[:, 0, :]
    vectors.append(cls_embeddings.cpu())

    return torch.cat(vectors, dim=0)

@app.route('/api/data')
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

@app.route('/api/gen_playlist', methods=['POST'])
def gen_playlist():
    data = request.get_json()
    playlist_name = data['playlist_name']
    library_songs = data['library_songs']
    playlist_size = data['playlist_size']

    titles = [song['title'] for song in library_songs]

    playlist_vector = encode_text([playlist_name])[0]
    song_vectors = encode_text(titles)

    loaded_model = load('../logistic_regression_model_joblib.pkl')

    predictions = []
    for i in range(len(song_vectors)):
        pred_prob = loaded_model.predict_proba([playlist_vector + song_vectors[i]])
        predictions.append((titles[i], pred_prob[0][1]))

    predictions = sorted(predictions, key=lambda x: x[1])
    top_n_songs = predictions[0:playlist_size]

    return jsonify(top_n_songs)

if __name__ == '__main__':
    app.run(debug=True)
    