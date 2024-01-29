import psycopg2
from http.server import HTTPServer, BaseHTTPRequestHandler

class sserver(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/website/index.html'
        try:
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file_to_open = "File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))

httpd = HTTPServer(('localhost', 8080), sserver)
httpd.serve_forever()

connection = psycopg2.connect(host="", dbname="", user="", password="", port="")

cur = connection.cursor()

connection.commit()

cur.execute("""SELECT * FROM users WHERE username = 'calvin';""")

print(cur.fetchone())



cur.close()
connection.close()
