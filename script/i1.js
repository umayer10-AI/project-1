function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const btn = document.querySelector(".button");

const a = async () => {
    const a = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const b = await a.json();
    const c = b.data;
    btn.innerHTML = "";
    
    c.forEach(v => {
        let d = document.createElement("button");
        d.id = v.level_no;
        d.className = "btn btn-outline btn-primary";
        d.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson -${v.level_no}`
        btn.appendChild(d);
    });
}
a();

const spin = (bool) => {
    if(bool === true){
        document.getElementById("spinner").classList.remove("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
    }
}

const creteElement = (a) => {
    const m = a.map(v => `<span class="btn btn-soft btn-accent">${v}</span>`);
    return m.join(" ");
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const a = await fetch(url);
    const b = await a.json();
    detail(b.data);
}

const detail = (p) => {
    console.log(p);
    const box = document.getElementById("detail-container");
    box.innerHTML = `<div>
                <h2 class="text-xl font-bold">${p.word} (<i class="fa-solid fa-microphone-lines"></i> :${p.pronunciation})</h2>
                </div>
                <div class="space-y-2">
                    <h2 class="text-base font-bold">Meaning</h2>
                    <p class="text-base">${p.meaning}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="text-base font-bold">Example</h2>
                    <p class="text-base text-neutral/50">${p.sentence}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="text-base">সমার্থক শব্দ গুলো</h2>
                    <div class="">${creteElement(p.synonyms)}</div>
                </div>`;

    document.getElementById("my_modal").showModal();
}



btn.addEventListener("click", (e) => {
    if(e.target.matches("button")){
        const b = e.target.id;
        const bb = document.getElementById(b);
            const b1 = document.getElementById("1");
            const b2 = document.getElementById("2");
            const b3 = document.getElementById("3");
            const b4 = document.getElementById("4");
            const b5 = document.getElementById("5");
            const b6 = document.getElementById("6");
            const b7 = document.getElementById("7");

            b1.classList.remove("bg-primary", "text-white");
            b2.classList.remove("bg-primary", "text-white");
            b3.classList.remove("bg-primary", "text-white");
            b4.classList.remove("bg-primary", "text-white");
            b5.classList.remove("bg-primary", "text-white");
            b6.classList.remove("bg-primary", "text-white");
            b7.classList.remove("bg-primary", "text-white");

            bb.classList.add("bg-primary", "text-white");

            // console.log(bb);

        let g = async () => {
            spin(true);
            const url = `https://openapi.programming-hero.com/api/level/${e.target.id}`;
            const f = await fetch(url);
            const j = await f.json();
            const jj = j.data;
            // console.log(j.data);

            const card = document.querySelector(".card");
            card.innerHTML = "";

            if(jj.length === 0){

                card.innerHTML = `
                    <div class="col-span-full text-center my-10">
                        <div class="text-neutral/30 text-7xl mb-4">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div class="space-y-4">
                            <p class="text-neutral/50">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                            <p class="font-semibold text-3xl">নেক্সট Lesson এ যান</p>
                        </div>
                    </div>`;

                spin(false);
                return;
            }

            jj.forEach(v => {
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="p-6 space-y-5 bg-white rounded-xl shadow-sm kk">
                    <div class="space-y-3 text-center">
                        <p class="font-bold text-2xl">${v.word ? v.word : "শব্দ পাওয়া যায়নি"}</p>
                        <p>Meaning /Pronounciation</p>
                        <h3 class="text-xl font-medium">"${v.meaning ? v.meaning : "অর্থ পাওয়া যায়নি"} / ${v.pronunciation ? v.pronunciation : "Pronunciation পাওয়া যায়নি"}"</h3>
                    </div>
                    <div class="flex justify-between items-center">
                        <button onclick = "loadWordDetail(${v.id})" class="btn btn-outline btn-info btn11"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick = "pronounceWord('${v.word}')" class="btn btn-outline btn-info"><i class="fa-solid fa-volume-high"></i></button>
                        
                    </div>
                </div>`
                card.appendChild(div);
            })
            // let k = document.querySelector(".btn11");
            // console.log(k);
            spin(false);
        }
        g();
    }
});

let allWords = [];

const localAllWords = async () => {
    const a = await fetch("https://openapi.programming-hero.com/api/words/all");
    const b = await a.json();
    allWords = b.data;
}
localAllWords();

const s = document.querySelector("#btn-search");
s.addEventListener("click", () => {
    gg();
    const input = document.querySelector("#input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    const fw = allWords.filter(x => x.word.toLowerCase().includes(searchValue));
    console.log(fw);
    const card = document.querySelector(".card");
    card.innerHTML = "";

    if(fw.length === 0){
        card.innerHTML = `<p class="col-span-full text-center text-xl">No Word Found ❌</p>`;
        return;
    }

    fw.forEach(v => {
        const div = document.createElement("div");
                div.innerHTML = `
                <div class="p-6 space-y-5 bg-white rounded-xl shadow-sm kk">
                    <div class="space-y-3 text-center">
                        <p class="font-bold text-2xl">${v.word ? v.word : "শব্দ পাওয়া যায়নি"}</p>
                        <p>Meaning /Pronounciation</p>
                        <h3 class="text-xl font-medium">"${v.meaning ? v.meaning : "অর্থ পাওয়া যায়নি"} / ${v.pronunciation ? v.pronunciation : "Pronunciation পাওয়া যায়নি"}"</h3>
                    </div>
                    <div class="flex justify-between items-center">
                        <button onclick = "loadWordDetail(${v.id})" class="btn btn-outline btn-info btn11"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick = "pronounceWord('${v.word}')" class="btn btn-outline btn-info"><i class="fa-solid fa-volume-high"></i></button>
                        
                    </div>
                </div>`
            card.appendChild(div);
    })
})

let gg = () => {
    const b1 = document.getElementById("1");
            const b2 = document.getElementById("2");
            const b3 = document.getElementById("3");
            const b4 = document.getElementById("4");
            const b5 = document.getElementById("5");
            const b6 = document.getElementById("6");
            const b7 = document.getElementById("7");

            b1.classList.remove("bg-primary", "text-white");
            b2.classList.remove("bg-primary", "text-white");
            b3.classList.remove("bg-primary", "text-white");
            b4.classList.remove("bg-primary", "text-white");
            b5.classList.remove("bg-primary", "text-white");
            b6.classList.remove("bg-primary", "text-white");
            b7.classList.remove("bg-primary", "text-white");
}
















// const mainCard = document.querySelector(".card");
// mainCard.addEventListener("click", (e) => {
//         let p = e.target.closest(".btn11")
//         if(p){
//             // const modal = document.getElementById("my_modal_5");
//             // modal.showModal();
//         }
//         console.log(p.id);
// })