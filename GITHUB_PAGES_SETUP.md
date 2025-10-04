# GitHub Pages Setup Instructions

This calculator is perfect for GitHub Pages since it's entirely client-side (no server needed)!

## Quick Setup (5 minutes)

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/LGGGreg/Lathe-Thread-Gear-Chart-Generator
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will automatically build and deploy your site
- This takes 1-2 minutes
- You'll see a message: "Your site is live at https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/"

### Step 3: Access Your Calculator

Your calculator will be available at:
```
https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/
```

That's it! 🎉

## What Gets Deployed

GitHub Pages will serve:
- ✅ `index.html` - Main calculator page
- ✅ `css/styles.css` - Styling
- ✅ `js/calculator.js` - Calculator logic
- ✅ `images/` - Logo and diagrams
- ✅ `docs/` - Documentation
- ✅ `tests/` - Test suite (optional, but accessible)
- ❌ `node_modules/` - Excluded by .gitignore (not needed)

## Automatic Updates

Every time you push to the `main` branch:
1. GitHub automatically rebuilds the site
2. Changes go live in 1-2 minutes
3. No manual deployment needed!

## Custom Domain (Optional)

If you want a custom domain like `gears.yourdomain.com`:

1. Add a `CNAME` file to the repository root:
   ```
   gears.yourdomain.com
   ```

2. Configure DNS at your domain provider:
   ```
   Type: CNAME
   Name: gears
   Value: lgggreg.github.io
   ```

3. In GitHub Settings → Pages, enter your custom domain

## Testing

After deployment, test:
- ✅ Main calculator works
- ✅ Threading chart generates
- ✅ CSV export works
- ✅ localStorage saves settings
- ✅ Images load correctly
- ✅ All collapsible sections work

## Troubleshooting

### Site Not Loading?

1. Check Settings → Pages shows "Your site is published"
2. Wait 2-3 minutes after enabling
3. Try hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
4. Check browser console for errors

### Images Not Loading?

- Ensure image paths are relative (they are)
- Check `images/` folder is committed to git
- Verify file names match exactly (case-sensitive)

### JavaScript Not Working?

- Check browser console for errors
- Ensure `js/calculator.js` is committed
- Verify no CORS issues (shouldn't be any for same-origin)

## Sharing Your Calculator

Once deployed, share the link:
```
https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/
```

Perfect for:
- 🔗 Forum posts
- 📧 Email to fellow machinists
- 📱 Bookmark on phone/tablet
- 🖨️ Print reference charts
- 🎓 Teaching others

## Benefits of GitHub Pages

✅ **Free hosting** - No cost
✅ **HTTPS enabled** - Secure by default
✅ **Fast CDN** - Global content delivery
✅ **Automatic deployment** - Push to deploy
✅ **Version control** - Git history
✅ **No server maintenance** - GitHub handles it
✅ **Offline capable** - Works after first load
✅ **Mobile friendly** - Responsive design

## Repository Badge

Add this badge to your README.md to show deployment status:

```markdown
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)
```

Result: [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)

## Analytics (Optional)

To track usage, add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## Next Steps

After GitHub Pages is live:

1. ✅ Test all features
2. ✅ Share the link
3. ✅ Add link to README.md
4. ✅ Update documentation with live URL
5. ✅ Consider adding to machining forums/communities

## Support

If you encounter issues:
- Check GitHub Pages documentation: https://docs.github.com/en/pages
- Verify repository is public (required for free GitHub Pages)
- Check GitHub Actions tab for build errors

---

**Your calculator will be live at:**
## https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/

Enjoy! 🎉

