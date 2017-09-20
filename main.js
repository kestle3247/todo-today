// var taskList = ['wash my cat', 'shovel the driveway', 'go to the grocery store', 'learn javascript']
var taskList = [
    {
        task: 'get quarters from the bank',
        color: '#284'
    },
    {
        task: 'go to the grocery store',
        color: '#941'
    },
    {
        task: 'learn javascript',
        color: '#449'
    }
]
$(document).ready(function(){

    // $.get('/api/task').then(function(data){
        // var taskList = data.taskList
        // the rest of the app should be inside of this callback function, 


    // })

    // i'll put a $ in front of the task list element to help me remember it was made with jquery. this helps me distinguish it from the task-list array
    var $taskList = $('.task-list')

    // this function basically serves as my template.
    // unfortunately, I have to manually call this function every time my data change, if I want to update the view
    var render = function(){
        $taskList.empty()
        if ( taskList.length === 0 ) {
            $taskList.append("<li>You've finished all your tasks!</li>")

        }
        else {
            for ( var i = 0; i < taskList.length; i++ ) {
                // hex colors are usually 6 numbers, but you can use 3 as a shorthand
                // #369 === #336699
                $taskList.append(`<li style="color:${taskList[i].color}" data-task-number="${i}" class="task">${taskList[i].task}</li>`)
            }
        }
    }
    render()

    $('#new-task-form').on('submit', function(event){
        event.preventDefault()
        // var newTask = $('#new-task-name').val()
        var newTask = {
            task  : $('#new-task-name').val(),
            color : $('#new-task-color').val() 
        }

        // it's good to set intelligent defaults on forms, so that if users don't want to specify every little detail, your application can still behave sensibly. 
        if ( newTask.color === '' ) {
            newTask.color = '#222'
        }

        if ( newTask.task !== '' ) {
            taskList.push(newTask)
        }
        $.post('/api/task', newTask, function(){
            console.log('we updated the database with our up-to-date task list')
        })
        render()

        // we can reset a single input, or the whole form
        // $('#new-task-name').val('')
        $('#new-task-form')[0].reset()
    })


    $('body').on('click', '.task', function(event){
        // the event.target is the native DOM element. We can use native DOM methods on it, or pass it back into $() to get the jQuery version of that element. 
        // console.log(event.target.getAttribute('data-task-number'))
        var taskNumber = $(event.target).attr('data-task-number')
        // splice is DESTRUCTIVE. it modifies the original array instead of returning a new array, so it's not necessary to assign it to a variable.
        taskList.splice(taskNumber, 1)
        render()
        
    })

})
