async function initProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const container = document.getElementById('project-content-placeholder');

    if (!container) return;

    if (!projectId) {
        container.innerHTML = "<h2>Project not found!</h2><a href='index.html'>Go Back Home</a>";
        return;
    }

    try {
        // جلب البيانات مع إضافة ./ للتأكد من البحث في المجلد الرئيسي
        const response = await fetch('./projects.json');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const projects = await response.json();
        const project = projects.find(p => p.id === projectId);

        if (project) {
            document.title = `${project.title} | Details`;
            container.innerHTML = `
                <div class="fade-in visible">
                    <h1 class="hero__title" style="margin-bottom: 20px;">${project.title}</h1>
                    <div class="project-card__img" style="height: auto; margin-bottom: 30px;">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 15px;">
                    </div>
                    <div class="project-details__info">
                        <h2 style="color: var(--accent); margin-bottom: 15px;">About Project</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 25px; line-height: 1.8;">${project.description}</p>
                        
                        <h3 style="margin-bottom: 10px;">Technologies Used:</h3>
                        <div class="project-card__tech" style="margin-bottom: 30px; display:flex; gap:10px; flex-wrap:wrap;">
                            ${project.tech.map(t => `<span class="skill" style="background:rgba(0,119,255,0.1); padding:5px 15px; border-radius:20px; border:1px solid var(--accent);">${t}</span>`).join('')}
                        </div>
                        
                        <div class="project-card__links" style="margin-top: 40px;">
                            <a href="${project.live}" target="_blank" class="btn btn--primary">Live</a>
                            <a href="index.html" class="btn btn--outline" style="margin-left:10px;">Back to Home</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `<h2>Project "${projectId}" not found!</h2><a href="index.html">Go Back</a>`;
        }
    } catch (error) {
        console.error("Error loading project details:", error);
        container.innerHTML = "<h2>Failed to load project details. Please ensure you are using Live Server.</h2>";
    }
}

document.addEventListener('DOMContentLoaded', initProjectDetails);