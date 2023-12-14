const getURL = 'https://jsonplaceholder.typicode.com/posts'
const post_Container = document.getElementById('post-container')
const stcak_Loader = document.querySelector('.stack-loader')

const end_Of_Page = document.getElementById('endofpage')

var limit = 5
var page = 1

const getposts = async () => {
    const response = await fetch(
        getURL + `?_limit=${limit}&_page=${page}`
    )

    const posts = await response.json()
    console.log('insode', posts)
    return posts
}

const showposts = async () => {
    console.log('show')
    const posts = await getposts()

    posts.forEach(post => {
        if (post.title && post.body && post.id) {
            const postEl = document.createElement('div')

            postEl.classList.add('card', 'mb-4', 'box-shadow')
            postEl.innerHTML = `
            <div class="card-body d-flex flex-column justify-content-between " key='${post.id}'>
                <h5 class="card-title text-start ">${post.title}</h5>
                <div class="mb-2 text-start">
                    <span>${post.body}</span>
                </div>
                <button type="button" class="btn btn-lg btn-block btn-primary">Know More</button>
            </div>
        `
            post_Container.appendChild(postEl)
            console.log(posts)
        }
    })
}

const loading = () => {
    stcak_Loader.classList.add('load')

    setTimeout(() => {
        stcak_Loader.classList.remove('load')

        setTimeout(() => {
            page += 1
            showposts()
        }, 300)

    }, 2000)
}

window.addEventListener('scroll', () => {
    var { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loading()
    }
})

showposts()