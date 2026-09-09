-- For the PDF only: a job's company heading and the role line under it
-- become one \cventry, so the company can sit at the left and the dates at
-- the right margin, with the role and location on the line below. The
-- markdown keeps its "## Company" and "Role · _Location · Dates_" shape,
-- which is what parseExperience in buildResume.ts reads for the site.
if FORMAT ~= "latex" then
  return {}
end

local stringify = pandoc.utils.stringify

-- Inlines to escaped LaTeX ("&" in a role, for one).
local function tex(inlines)
  local s = pandoc.write(pandoc.Pandoc({ pandoc.Plain(inlines) }), "latex")
  return (s:gsub("%s+$", ""))
end

local function texs(str)
  return tex({ pandoc.Str(str) })
end

-- "Role · _Location · Dates_": the inlines before the first Emph are the
-- role; inside the Emph the last " · " piece is the dates and the rest is
-- the location.
local function split_role(para)
  local role, emph = {}, nil
  for _, il in ipairs(para.content) do
    if il.t == "Emph" and not emph then
      emph = il
    elseif not emph then
      table.insert(role, il)
    end
  end
  if not emph then
    return nil
  end
  local roleText = stringify(role):gsub("%s*·%s*$", "")
  local inner = stringify(emph.content)
  local location, dates = inner:match("^(.-)%s*·%s*([^·]+)$")
  if not dates then
    location, dates = "", inner
  end
  return roleText, location, dates
end

function Pandoc(doc)
  local out = {}
  local blocks = doc.blocks
  local i = 1
  while i <= #blocks do
    local b, nextb = blocks[i], blocks[i + 1]
    if b.t == "Header" and b.level == 2 and nextb and nextb.t == "Para" then
      local role, location, dates = split_role(nextb)
      if role then
        table.insert(
          out,
          pandoc.RawBlock(
            "latex",
            string.format(
              "\\cventry{%s}{%s}{%s}{%s}",
              tex(b.content),
              texs(dates),
              texs(role),
              texs(location)
            )
          )
        )
        i = i + 2
      else
        table.insert(out, b)
        i = i + 1
      end
    else
      table.insert(out, b)
      i = i + 1
    end
  end
  return pandoc.Pandoc(out, doc.meta)
end
