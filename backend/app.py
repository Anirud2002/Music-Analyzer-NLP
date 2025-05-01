from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import dump, load
from transformers import BertTokenizer, BertModel
import torch
import pandas as pd
import kagglehub

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
    #[{song_id, title, lyrics}]
    data = request.get_json()
    playlist_name = data['playlist_name']
    library_songs = data['library_songs']
    playlist_size = data['playlist_size']

    song_ids = [song['uri'] for song in library_songs]
    titles = [song['title'] for song in library_songs]
    artists = [song['artist'] for song in library_songs]

    song_data_list = []
    for i in range(len(song_ids)):
        song_data_list.append(SongData(song_ids[i], titles[i], artists[i]))

    loaded_model = load('../model.joblib')
    predictions = loaded_model.fit_predict(playlist_name, song_data_list, playlist_size)
    return jsonify(predictions)

class SongData:
    def __init__(self, song_id, title, artist):
        self.song_id = song_id
        self.title = title
        self.artist = artist

if __name__ == '__main__':
    app.run(debug=True)
    