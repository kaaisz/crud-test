#echo "Memoving old logs"
mv logs/*.log logs/old/
node server-app.js
