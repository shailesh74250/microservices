# How Elasticsearch Works? 
- Elasticsearch is a distributed search and analytics engine built on top of Apache Lucene. It is designed for fast and scalable searching of structured and unstructured data.

## How Elasticsearch Works Internally?
- Indexes Data:
  - Data is stored in indexes instead of traditional tables (like in SQL).
  - Each index contains multiple documents.
  - Documents are stored in JSON format.
- Analyzes & Tokenizes Data:
    - Elasticsearch uses analyzers to break text into tokens (words, phrases).
    - Example: "Hello World" → ["hello", "world"] (tokens)
- Stores & Distributes Data:
  - Data is sharded into smaller pieces to enable fast retrieval.
  - Each shard can be replicated for fault tolerance.
- Performs Searches Efficiently:
  - Uses inverted indexes for fast lookup.
  - Supports full-text search, fuzzy matching, multi-field search, etc.
 
        Feature	SQL Indexing (PostgreSQL, MySQL)	Elasticsearch (Distributed Search Engine)
        Search Speed	Slower for large datasets 🚶	Lightning-fast 🔥 (Milliseconds)
        Full-Text Search	Basic (LIKE, ILIKE, FULLTEXT)	Advanced NLP-based search
        Multi-Field Search	Limited performance ⚠️	Easily searches across multiple fields
        Fuzzy Search (Typos)	Not efficient ❌	Handles typos & misspellings ✅
        Scalability	Struggles with large data 🚧	Handles billions of records seamlessly
        Faceted Search (Filters)	Manual queries needed 🛠️	Built-in filtering support 🎯
        Sorting & Ranking	Basic ORDER BY clause	Advanced relevance ranking (BM25)
        Distributed Scaling	Hard to scale read-heavy load	Horizontally scales easily 📈
        Real-time Analytics	Slow on large datasets	Near real-time updates 🚀
