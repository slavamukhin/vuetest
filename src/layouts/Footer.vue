<script setup lang="ts">
import IconLinkedIn from "@/components/icons/iconLinkedIn.vue";
import IconFacebook from "@/components/icons/iconFacebook.vue";
import IconInstagram from "@/components/icons/iconInstagram.vue";
import IconX from "@/components/icons/iconX.vue";
</script>

<template>
  <footer class="footer">
    <div class="heading5 copyright">© 2025 Shelly</div>
    <div class="social-networks">
      <a
        class="social-link"
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconLinkedIn class="social-icon" />
      </a>
      <a
        class="social-link"
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconFacebook class="social-icon" />
      </a>
      <a
        class="social-link"
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconInstagram class="social-icon" />
      </a>
      <a class="social-link" href="https://x.com/" target="_blank" rel="noopener noreferrer">
        <IconX class="social-icon" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  height: 159px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copyright {
  margin-bottom: 0;
}

.social-networks {
  display: flex;
  align-items: flex-end;
  gap: 30px;
}

.social-link .social-icon {
  color: var(--color-secondary-dark-gray);
}

.social-link:hover .social-icon {
  color: var(--color-primary-black);
}
</style>
