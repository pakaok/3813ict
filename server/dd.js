let fs = require('fs')
    data={
    user: [['super','superemail','Super',4],['gadmin1','gademail','GroupAdmin',3,{g1:'1,2',g2:'1'}]],
    groups: {g1:'1,2',g2:'1,2'}
}
one=JSON.stringify(data)
    fs.writeFileSync("db.json",one)