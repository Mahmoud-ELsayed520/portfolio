/**
 * Projects module - Fetch and render project cards with skeleton loader
 */

function renderSkeletonLoaders(container, count = 3) {
  const skeletonHTML = Array(count)
    .fill(0)
    .map(
      () => `
    <article class="project-card project-card--skeleton">
      <div class="project-card__img">
        <div class="skeleton skeleton--image"></div>
        <div class="skeleton skeleton--title"></div>
        <div class="skeleton skeleton--line skeleton--line-1"></div>
        <div class="skeleton skeleton--line skeleton--line-2"></div>
        <div class="skeleton skeleton--tech">
          <span class="skeleton skeleton--chip"></span>
          <span class="skeleton skeleton--chip"></span>
          <span class="skeleton skeleton--chip"></span>
        </div>
      </div>
    </article>
  `
    )
    .join('');
  container.innerHTML = skeletonHTML;
}

export async function initProjects() {
  const container = document.querySelector('.projects__grid');
  if (!container) return;

  renderSkeletonLoaders(container);

  try {
    const res = await fetch('projects.json');
    const projects = await res.json();

    container.innerHTML = projects
      .map(
        (p) => `
      <article class="project-card">
        <div class="project-card__img">
          <img src="${p.image}" alt="${p.title}">
          <div class="project-card__overlay">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="project-card__tech">
              ${p.tech.map((t) => `<span>${t}</span>`).join('')}
            </div>
            <div class="project-card__links">
              <a href="${p.live}" class="btn btn--sm">Live</a>
              <a href="projects.html?id=${p.id}" class="btn btn--sm">Details</a>
            </div>
          </div>
        </div>
      </article>
    `
      )
      .join('');
  } catch (e) {
    container.innerHTML = '<p>Error loading projects</p>';
    console.error(e);
  }
}
