export const update_app_api = (all_apps,new_app) => {
    all_apps[new_app['platform']].push(new_app)   
    return all_apps
}

export const edit_app_api = (all_apps,edit_app) => {

    all_apps[edit_app['platform']].map(app =>{ 
       if(app.id1 == edit_app['id1']){
          
           for(let i in edit_app){
               app[i]  = edit_app[i]
           }
       }
    })
    return all_apps
}